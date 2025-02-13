#!/bin/sh
echo "Устанавливаем необходимые пакеты..."
pkg update -y
pkg upgrade -y
pkg install -y python openssl
cd ~
git clone https://github.com/werpyock/werpyockuserbot.git
cd werpyockuserbot
echo "Устанавливаем зависимости Python для запуска..."
pip install --upgrade pip
pip install telethon
clear
echo "Запускаю установку Werpyock Userbot.."
python start.py
