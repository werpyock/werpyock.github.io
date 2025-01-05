const repo = 'werpyock/werpyock.github.io', path = 'modules';
    document.getElementById('refresh').addEventListener('click', loadModules);
    window.onload = loadModules;

    function loadModules() {
        fetch(`https://api.github.com/repos/${repo}/contents/${path}`)
            .then(response => { if (!response.ok) throw new Error('Network response was not ok'); return response.json(); })
            .then(data => {
                const fileList = document.getElementById('file-list');
                fileList.innerHTML = data.map(file => `
                    <li>${file.name}<span class="file-actions">
                    <button onclick="window.open('${file.download_url}', '_blank')">Redirect</button>
                    <button onclick="loadFile('${file.path}')">View in Place</button></span></li>
                `).join('');
            })
            .catch(error => {
                console.error('Error fetching repository contents:', error);
                document.getElementById('file-content').textContent = 'Error loading files. Please check the console for details.';
            });
    }

    function loadFile(filePath) {
        fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`)
            .then(response => { if (!response.ok) throw new Error('Network response was not ok'); return response.json(); })
            .then(data => {
                document.getElementById('file-content').textContent = data.content ? atob(data.content) : 'File not found or not accessible.';
            })
            .catch(error => {
                console.error('Error fetching file content:', error);
                document.getElementById('file-content').textContent = 'Error loading file content. Please check the console for details.';
            });
    }
