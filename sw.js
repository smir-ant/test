self.addEventListener('fetch', event => {
    // Проверяем, если запрашивается /test/
    event.respondWith(
    (async () => {
        // Используем OffscreenCanvas для генерации изображения
        // (Поддержка OffscreenCanvas должна быть проверена в целевых браузерах)
        const offscreen = new OffscreenCanvas(50, 50);
        const ctx = offscreen.getContext('2d');

        // Рисуем фон и цифру "1"
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 50, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1', 25, 25);

        // Конвертируем в Blob с MIME-типом image/png
        const blob = await offscreen.convertToBlob({ type: 'image/png' });
        return new Response(blob, {
        headers: { 'Content-Type': 'image/png' }
        });
    })()
    );
});
  