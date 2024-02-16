import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Divider, Button, CardFooter } from "@nextui-org/react";
import axios from 'axios'; // Import axios for making HTTP requests
import { verifyCredentials } from "../Utils/SetLogin";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username.trim().length > 0 && password.trim().length > 0) {
      setLoading(true);
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_API}/Login`, { username, password });
        if (response.status === 200) {
          const { encryptedUsername, encryptedPassword } = response.data;
          sessionStorage.setItem("_Data1", encryptedUsername);
          sessionStorage.setItem("_Data2", encryptedPassword);
          await verifyCredentials();
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error, such as displaying an error message to the user
      } finally {
        setLoading(false);
      }
    }
  };
  
  

  return (
    <>
      <form>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-lg">Login</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="bordered"
                  label="Nama"
                  placeholder="Masukan nama"
                />
                <Input
                  isRequired
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="bordered"
                  label="Password"
                  placeholder="Masukan password"
                />
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            {!loading ? (
              <Button color="success" radius="lg" variant="ghost" onClick={() => handleLogin()}>
                Masuk
              </Button>
            ) : (
              <Button isLoading color="success" radius="lg">
                Masuk
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
