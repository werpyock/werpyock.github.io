#!/bin/bash

loading_animation() {
    local pid=$1
    local delay=0.5
    local spinstr='|/-\'
    tput civis
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
    tput cnorm
}
(sleep 5) &
task_pid=$!

loading_animation $task_pid

echo "Task completed."
