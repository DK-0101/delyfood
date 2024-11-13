import axios from "axios";


export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8800/api/users/register",
      data,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("Registro bem-sucedido:", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Credenciais inválidas");
    } else {
      console.log("Erro ao registrar fazer login:", error.message);
    }
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      "http://localhost:8800/api/users/login",
      data,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("Login bem-sucedido:", response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Credenciais inválidas");
    } else {
      console.log("Erro ao fazer login:", error.message);
    }
  }
};

