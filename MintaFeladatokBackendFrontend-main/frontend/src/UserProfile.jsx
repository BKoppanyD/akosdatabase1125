export default function UserProfile({ getUser }) {
    const user = getUser()

    if (!user) return null

    return (
        <div className="container mt-4" style={{ maxWidth: "550px" }}>
            <div className="card p-4 shadow-sm">
                <h1 className="mb-3">Profil</h1>
                <p><strong>Név:</strong> {user.name}</p>
                {user.email && <p><strong>Email cím:</strong> {user.email}</p>}
                <p><strong>Felhasználói azonosító:</strong> {user.id}</p>
                <p className="mb-0"><strong>Jogosultság:</strong> {user.role === 1 ? "Admin" : "Felhasználó"}</p>
            </div>
        </div>
    )
}