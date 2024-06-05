import Trash from "bootstrap";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
    const inputName = useRef();
    const inputIdade = useRef();
    const inputEmail = useRef();
    const inputTelefone = useRef();

    const [users, setUsers] = useState([]);

    async function getUsers() {
        const usersFromApi = await api.get("/");

        setUsers(usersFromApi.data);
    }

    async function createUsers() {
        await api.post("/", {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value,
            phone: inputTelefone.current.value,
        });
    }

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="container">
                <form>
                    <h1>Cadastro de Usuários</h1>
                    <input
                        placeholder="Nome"
                        name="nome"
                        type="text"
                        ref={inputName}
                    />
                    <input
                        placeholder="Idade"
                        name="idade"
                        type="number"
                        ref={inputIdade}
                    />
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        ref={inputEmail}
                    />
                    <input
                        placeholder="Telefone"
                        name="telefone"
                        type="number"
                        ref={inputTelefone}
                    />
                    <button type="button" onClick={createUsers}>
                        Cadastrar
                    </button>
                </form>
            </div>

            {users.map((user) => (
                <div className="card" key={user.id}>
                    <div>
                        <p>
                            Nome: <span>{user.name}</span>
                        </p>
                        <p>
                            Idade:<span>{user.age}</span>
                        </p>
                        <p>
                            Email:<span>{user.email}</span>
                        </p>
                        <p>
                            Telefone: <span>{user.phone}</span>
                        </p>
                        <button onClick={() => deleteUsers(user.id)}>
                            <img src={Trash} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Home;
