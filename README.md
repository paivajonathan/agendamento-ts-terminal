# Trabalho Final de Programação Orientada a Objetos

## Descrição do Projeto

O projeto consiste em um sistema de gerenciamento de consultas médicas,
para facilitar a interação entre médicos, pacientes e
administradores de uma clínica médica.

## Requisitos

### Funcionalidades:
- **Agendamento de Consultas:** Permitir que pacientes marquem consultas.
- **Perfil de Médicos e Pacientes:** Manter registros de médicos e pacientes.
- **Histórico Médico:** Acesso ao histórico médico dos pacientes.
- **Gerenciamento de Horários:** Organizar e visualizar a disponibilidade dos médicos.

### Conceitos de POO:
- **Encapsulamento:** Classes para pacientes, médicos, consultas e históricos médicos.
- **Herança:** Diferentes classes para especialidades médicas.
- **Polimorfismo:** Métodos para agendamento conforme o tipo de consulta.
- **Exceções:** Tratamento de conflitos de agendamento ou dados médicos incompletos.

## Perfis de Usuário Pré-Cadastrados

### Administrador

- **Login:** `admin@gmail.com`
- **Senha:** `Admin@123`

### Médico

- **Login:** `medico@gmail.com`
- **Senha:** `Medico@123`

### Paciente

- **Login:** `paciente@gmail.com`
- **Senha:** `Paciente@123`

## Operações Possíveis

### Administrador

- Visualizar médicos
- Visualizar especialidades
- Cadastrar médicos
- Cadastrar especialidades

### Médico

- Visualizar consultas
- Visualizar pacientes
- Visualizar histórico médico de pacientes
- Confirmar consultas
- Cancelar consultas

### Paciente

- Cadastro próprio
- Visualizar consultas
- Visualizar médicos
- Visualizar histórico médico
- Agendar consultas

## Como rodar a aplicação

No terminal, clone o projeto:
```bash
git clone https://github.com/paivajonathan/agendamento-ts-terminal.git
```

Entre na pasta do projeto:
```bash
cd agendamento-ts-terminal
```

Instale as dependências:
```bash
npm install
```

Execute a aplicação:
```bash
npm start
```

## Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Readline-Sync](https://www.npmjs.com/package/readline-sync)

## Autores

- [Jonathan Paiva](https://github.com/paivajonathan/)
- [Patrine Galeno](https://github.com/PatrineGaleno/)

## Agradecimentos

- [Prof. MSc. Antônio Sousa](https://github.com/antssousa/antssousa/)
