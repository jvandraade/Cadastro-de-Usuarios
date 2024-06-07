import Trash from "bootstrap";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
    [form, setForm] = useState({
        nome: "",
        idade: "",
        email: "",
        telefone: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.nome) newErrors.nome = "O nome é obrigatório";
        if (!form.idade) {
            newErrors.idade = "A idade é obrigatória";
        } else if (!/^\d+$/.test(form.idade) || form.idade < 1) {
            newErrors.idade = "A idade deve ser um número válido e maior que 0";
        }
        if (!form.email) {
            newErrors.email = "O email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "O email não é válido";
        }
        if (!form.telefone) {
            newErrors.telefone = "O telefone é obrigatório";
        } else if (!/^\d{10,11}$/.test(form.telefone)) {
            newErrors.telefone = "O telefone deve ter 10 ou 11 dígitos";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Formulário enviado", form);
            // Lógica para enviar os dados do formulário
        }
    };

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
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro de Usuários</h1>
                    <input
                        placeholder="Nome"
                        name="nome"
                        type="text"
                        ref={inputName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Idade"
                        name="idade"
                        type="number"
                        ref={inputIdade}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        ref={inputEmail}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Telefone"
                        name="telefone"
                        type="number"
                        ref={inputTelefone}
                        onChange={handleChange}
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
