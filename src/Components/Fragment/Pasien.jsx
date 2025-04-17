import { useState, useEffect } from "react";

function PasienAdd() {
  // State Management
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    diagnosis: "",
    id: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Configuration
  const API_URL = "http://localhost:5000/patients";

  // Fetch all patients
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch patients");
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let response;
      const method = formData.id ? "PUT" : "POST";
      const url = formData.id ? `${API_URL}/${formData.id}` : API_URL;

      response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok)
        throw new Error(`Failed to ${formData.id ? "update" : "add"} patient`);

      await fetchPatients();
      resetForm();
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      diagnosis: "",
      id: null,
    });
  };

  // Handle edit patient
  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      diagnosis: patient.diagnosis,
      id: patient.id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete patient
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete patient");
      await fetchPatients();
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-4xl"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Patient Management System
      </h1>

      {/* Search Bar */}
      <div className="mb-6 opacity-90">
        <input
          type="text"
          placeholder="Search patients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patient Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 opacity-90"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {formData.id ? "Edit Patient" : "Add New Patient"}
        </h2>

        {error && ( 
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isLoading ? "Processing..." : formData.id ? "Update" : "Save"}
          </button>

          {formData.id && (
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Patient List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden opacity-90">
        <h2 className="text-xl font-semibold p-4 bg-gray-100 text-gray-800">
          Patient List
        </h2>

        {isLoading && !patients.length ? (
          <div className="p-8 text-center text-gray-500">
            Loading patients...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700">{error}</div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm
              ? "No matching patients found"
              : "No patients available"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {patient.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{patient.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">
                        {patient.diagnosis || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
  
}



export default PasienAdd;


