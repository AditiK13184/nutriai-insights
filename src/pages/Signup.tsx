import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    activity: "",
    dietary: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Save all signup details to localStorage
    localStorage.setItem("user", JSON.stringify(form));

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-xl shadow-md w-full max-w-2xl space-y-6 border border-border"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Create Your Account</h1>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            name="name"
            placeholder="Full Name"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.name}
            onChange={handleChange}
          />

          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.email}
            onChange={handleChange}
          />

          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.password}
            onChange={handleChange}
          />

          <input
            required
            name="age"
            type="number"
            placeholder="Age"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.age}
            onChange={handleChange}
          />

          <select
            required
            name="gender"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          <input
            required
            name="height"
            type="number"
            placeholder="Height (cm)"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.height}
            onChange={handleChange}
          />

          <input
            required
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.weight}
            onChange={handleChange}
          />
        </div>

        {/* Goals */}
        <h2 className="text-xl font-semibold">Your Goals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            required
            name="goal"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.goal}
            onChange={handleChange}
          >
            <option value="">Goal Type</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Maintain">Maintain Weight</option>
            <option value="Muscle Gain">Muscle Gain</option>
          </select>

          <select
            required
            name="activity"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.activity}
            onChange={handleChange}
          >
            <option value="">Activity Level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Active">Active</option>
            <option value="Very Active">Very Active</option>
          </select>

          <input
            required
            name="calories"
            type="number"
            placeholder="Daily Calorie Goal"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.calories}
            onChange={handleChange}
          />

          <input
            required
            name="protein"
            type="number"
            placeholder="Daily Protein Goal (g)"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.protein}
            onChange={handleChange}
          />

          <input
            required
            name="carbs"
            type="number"
            placeholder="Daily Carb Goal (g)"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.carbs}
            onChange={handleChange}
          />

          <input
            required
            name="fats"
            type="number"
            placeholder="Daily Fat Goal (g)"
            className="px-4 py-2 border rounded-lg bg-muted w-full"
            value={form.fats}
            onChange={handleChange}
          />
        </div>

        {/* Preferences */}
        <h2 className="text-xl font-semibold">Food Preferences</h2>

        <select
          required
          name="dietary"
          className="px-4 py-2 border rounded-lg bg-muted w-full"
          value={form.dietary}
          onChange={handleChange}
        >
          <option value="">Dietary Preference</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Vegan">Vegan</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90"
        >
          Create Account
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;