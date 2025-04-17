import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User logged in:", formData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 backdrop-blur-md bg-opacity-90"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Dont have an account?{""}
          <a
            href="/Register"
            className="text-indigo-500 hover:underline font-bold"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
