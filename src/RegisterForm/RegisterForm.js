import React, { useState } from "react";

const initialState = { username: "", email: "", password: "" };

export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useState(null);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initialState);
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register Form</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          name="username"
          type="text"
          placeholder="User name"
          style={{
            margin: "5px"
          }}
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          style={{
            margin: "5px"
          }}
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          style={{
            margin: "5px"
          }}
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      {user && JSON.stringify(user, null, 3)}
    </div>
  );
}
