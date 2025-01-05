const repo = 'werpyock/werpyock.github.io', path = 'modules';
    document.getElementById('refresh').addEventListener('click', loadModules);
    window.onload = loadModules;

    function loadModules() {
        fetch(`https://api.github.com/repos/${repo}/contents/${path}`)
            .then(response => { if (!response.ok) throw new Error('Ошибка сети'); return response.json(); })
            .then(data => {
                const fileList = document.getElementById('file-list');
                fileList.innerHTML = data.map(file => `
                    <li>${file.name} | <span class="file-actions">
                    | <button onclick="window.open('${file.download_url}', '_blank')">Посмотреть на GitHub</button>
                    | <button onclick="loadFile('${file.path}')">Посмотреть на сайте</button></span></li>
                `).join('');
            })
            .catch(error => {
                console.error('Ошибка фетча репозитория:', error);
                document.getElementById('file-content').textContent = 'Ошибка фетча файлов репозитория.';
            });
    }

    function loadFile(filePath) {
        fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`)
            .then(response => { if (!response.ok) throw new Error('Ошибка сети'); return response.json(); })
            .then(data => {
                document.getElementById('file-content').textContent = data.content ? atob(data.content) : 'Файл удален или он недоступен.';
            })
            .catch(error => {
                console.error('Ошибка фетча:', error);
                document.getElementById('file-content').textContent = 'Ошибка загрузки контента файла!';
            });
    }
