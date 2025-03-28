// backend.js

class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.id = Date.now(); // ID único baseado no timestamp
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    getNome() { return this.nome; }
    getIdade() { return this.idade; }
    getCargo() { return this.cargo; }
    getSalario() { return this.salario; }

    setNome(nome) { this.nome = nome; }
    setIdade(idade) { this.idade = idade; }
    setCargo(cargo) { this.cargo = cargo; }
    setSalario(salario) { this.salario = salario; }

    toString() {
        return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario.toFixed(2)}`;
    }
}

const funcionarios = [];

// Função para atualizar a tabela
const atualizarTabela = () => {
    const tbody = document.querySelector("#tabela-funcionarios tbody");
    tbody.innerHTML = "";

    funcionarios.forEach(funcionario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>R$ ${funcionario.salario.toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${funcionario.id})">Editar</button>
                <button onclick="excluirFuncionario(${funcionario.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Cadastrar funcionário
const cadastrarFuncionario = () => {
    const nome = document.querySelector("#nome").value;
    const idade = parseInt(document.querySelector("#idade").value);
    const cargo = document.querySelector("#cargo").value;
    const salario = parseFloat(document.querySelector("#salario").value);

    if (nome && idade && cargo && salario) {
        funcionarios.push(new Funcionario(nome, idade, cargo, salario));
        atualizarTabela();
    }
};

document.querySelector("#cadastrar").addEventListener("click", () => cadastrarFuncionario());

// Excluir funcionário
const excluirFuncionario = id => {
    const index = funcionarios.findIndex(f => f.id === id);
    if (index !== -1) {
        funcionarios.splice(index, 1);
        atualizarTabela();
    }
};

// Editar funcionário
const editarFuncionario = id => {
    const funcionario = funcionarios.find(f => f.id === id);
    if (funcionario) {
        document.querySelector("#nome").value = funcionario.nome;
        document.querySelector("#idade").value = funcionario.idade;
        document.querySelector("#cargo").value = funcionario.cargo;
        document.querySelector("#salario").value = funcionario.salario;
        
        document.querySelector("#cadastrar").style.display = "none";
        const btnSalvar = document.querySelector("#salvar");
        btnSalvar.style.display = "inline";
        btnSalvar.onclick = () => {
            funcionario.setNome(document.querySelector("#nome").value);
            funcionario.setIdade(parseInt(document.querySelector("#idade").value));
            funcionario.setCargo(document.querySelector("#cargo").value);
            funcionario.setSalario(parseFloat(document.querySelector("#salario").value));
            
            atualizarTabela();
            document.querySelector("#cadastrar").style.display = "inline";
            btnSalvar.style.display = "none";
        };
    }
};

// Relatórios
const listarSalarioMaior5000 = () => console.log(funcionarios.filter(f => f.salario > 5000));
const calcularMediaSalarial = () => console.log(funcionarios.reduce((acc, f) => acc + f.salario, 0) / funcionarios.length || 0);
const listarCargosUnicos = () => console.log([...new Set(funcionarios.map(f => f.cargo))]);
const listarNomesMaiusculo = () => console.log(funcionarios.map(f => f.nome.toUpperCase()));
