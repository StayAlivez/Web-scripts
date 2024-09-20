axios.get('https://example.com/some-file')
    .then(response => {
        const contentType = response.headers['content-type'];
        console.log('MIME 类型:', contentType);
    })
    .catch(error => {
        console.error('请求失败:', error);
    });