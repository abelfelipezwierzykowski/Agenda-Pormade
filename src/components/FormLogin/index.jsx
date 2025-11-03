import React, { useState } from 'react';
import Botao from '../Botao';
import styled from 'styled-components';
import { Paragrafo } from '../Barra';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GuardaForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FundoForm = styled.form`
  position: relative;
  background-color: rgba(0, 0, 0, 0.7); 
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vh;
  height: ${({ $height }) => $height || "50%"};
  gap: ${({ $Gap }) => $Gap || "30px"};
`;

const Textoh2 = styled.h2`
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 60px;
`;

export const Inputs = styled.input`
  width: 85%;
  height: 56px;
  padding: ${({ $Padding }) => $Padding || "0 8px"};
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 20px;
`;

const SpanParagrafo = styled.span`
  color: #00b000;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginDiv() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const res = await axios.post('http://localhost:3000/auth/login', {
        email: login,   
        senha: senha
      });
      alert("Login realizado com sucesso")
      const { token } = res.data;

      // 🔹 Salvar token no localStorage
      localStorage.setItem('token', token);

      // 🔹 Redirecionar para página inicial
      navigate('/paginainicial');
    } catch (err) {
      console.error(err.response?.data);
      setErro(err.response?.data?.mensagem || 'Erro no login,verifique as informações');
    }
  };

  return (
    <GuardaForm>
      <FundoForm onSubmit={handleSubmit}>
        <Textoh2>Entrar</Textoh2>

        <Inputs
          type="text"
          placeholder="Email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete='off'
        />

        <Inputs
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete='off'
        />

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <Botao type="submit" value="Entrar" />

        <Paragrafo $fontSize="20px" $fontalign="center">
          Não tem uma conta? 
          <SpanParagrafo onClick={() => navigate("/cadastro")}>
            Crie uma
          </SpanParagrafo>
        </Paragrafo>
      </FundoForm>
    </GuardaForm>
  );
}

