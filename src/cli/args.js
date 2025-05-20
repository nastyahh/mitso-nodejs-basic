const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = [];

    for (let i = 0; i < args.length; i += 2) {
        if (args[i].startsWith('--')) {
            const propName = args[i].slice(2);
            const value = args[i + 1];
            if (value !== undefined) {
                result.push(`${propName} is ${value}`);
            }
        }
    }

    console.log(result.join(', '));
};

parseArgs();