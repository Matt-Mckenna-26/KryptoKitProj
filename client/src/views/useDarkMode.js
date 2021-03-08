import {useLocalStorage} from './useLocalStorage';
import React, { useState, useEffect } from 'react';

export const useDarkMode = (isEnabled) => {
    const [darkMode, setDarkMode] = useLocalStorage(isEnabled);
    console.log("MY mode" + darkMode)

    useEffect (() => {
        darkMode === true ? document.body.classList.add('dark-mode'): document.body.classList.remove('dark-mode');
    }, [darkMode])

    return [darkMode, setDarkMode];
}