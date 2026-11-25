import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login({ setUserLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault()
        setMessage("")
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))

                setUserLogin(data.user)
                if (data.user.role === 1) {
                    navigate("/adminHome")
                } else {
                    navigate("/profile")
                }
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            alert("Szerverhiba!")
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <div className="card p-4 shadow-sm">
                <h1 className="mb-4 text-center">Bejelentkezés</h1>
                {message && <p className="text-danger">{message}</p>}
                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email cím</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email cím"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Jelszó"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Bejelentkezés
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <span>Nincs még fiókod? </span>
                    <Link to="/register">Regisztráció</Link>
                </div>
            </div>
        </div>
    )
}