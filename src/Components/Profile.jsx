import React from "react";
import ThemeSwitcher from './ThemeSwitcher'
import { Card, CardHeader, CardBody, Avatar, Divider, Link, Image } from "@nextui-org/react";

export default function Profile({Nama, Kelas})  {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar showFallback src='https://images.unsplash.com/broken' />
                    <div className="flex flex-col">
                        <p className="text-md">{Nama != null ? (Nama):('Nama siswa')}</p>
                        <p className="text-small text-default-500">Kelas: {Kelas != null ? (Kelas):('Kelas siswa')}</p>
                    </div>
                </div>
                <ThemeSwitcher />
            </CardHeader>
            <Divider />
            <CardBody>
            </CardBody>
            <Divider />
        </Card>
    );
}