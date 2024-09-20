fetch('https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_dc0e41942c9a4d7c8d1f949cf8a96f81/default/light/3.0')
    .then(response => {
        const contentType = response.headers.get('Content-Type');
        console.log('MIME 类型:', contentType);
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
