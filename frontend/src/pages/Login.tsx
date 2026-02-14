import { useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      await api.post("/login", {
        user: {
          email,
          password,
        },
      })

      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Erro ao fazer login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-primary-700 text-center">
          Cofrinho
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-xl transition hover:bg-primary-700 active:scale-95"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}