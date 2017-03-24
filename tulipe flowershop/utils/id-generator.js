function* generator() {
    let lastId = 0,
        forever = true;

    while (forever) {
        yield(lastId += 1);
    }
};

let idGenerator = generator();

module.exports = idGenerator;