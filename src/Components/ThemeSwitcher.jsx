import React from 'react'
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./Icon/MoonIcon";
import { SunIcon } from "./Icon/SunIcon";
import {useTheme} from "next-themes";

function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    if (!mounted) return null;
    return (
        <Switch
            defaultChecked={theme === 'dark'} // Reflect the current theme state
            size="sm"
            color="secondary"
            onChange={handleThemeToggle} // Call handleThemeToggle when the switch is toggled
            thumbIcon={({ checked, className }) =>
                checked ? <SunIcon className={className} /> : <MoonIcon className={className} />
            }
        >
        </Switch>
    );
}

export default ThemeSwitcher