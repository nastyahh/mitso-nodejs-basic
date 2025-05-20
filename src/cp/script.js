const args = process.argv.slice(2);
console.log('Получены аргументы:', args);

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    process.stdout.write(`Дочерний процесс получил: ${input}\n`);
});

process.stdin.on('end', () => {
    console.log('Ввод завершен');
    process.exit(0);
}); 