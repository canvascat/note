const ARR1 = ['apple', 'pen', 'apple-pen'];
for (let i = 0; i < arr.length; i++) {
    const c = arr[i];
    arr[i] = c.substring(0, 1) + c.substring(1);
}