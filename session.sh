#!/usr/bin/env bash

SESSION=codetohtml

tmux has-session -t ${SESSION}
if [ $? != 0 ]
then
    tmux new-session -s ${SESSION} -n "main" -d
    tmux split-window -h -t ${SESSION}

    tmux send-keys -t 1 'npm run dev:assets' Enter
    tmux send-keys -t 2 'npm run dev:site' Enter
fi
tmux attach -t ${SESSION}
