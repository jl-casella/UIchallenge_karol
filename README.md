# UI challenge

This challenge finality is to build a system that should be able, given a hypothetical API call that will retrieve an array of products data, let the user pack those products.

Some of the functional requirements of the system should be the following ones:

- You should start by rendering all unpacked items at the left of a split view
- In the right section, you should be able to pack the items, by previously creating their packages (you can create multiple packages and pack items inside those packages)
- You can pack one item into the currently selected package by clicking on its row
- You also can pack by receiving a barcode scan (keyboard input sequence) with an SKU
- When an item is packed you can change it's quantities, by adding more items or removing (unpacking)



If you are able to test your code will be welcome (yarn test).

Styles are inline, replace them plus the new ones introduced in your new components with a better approach.

MAKE THE CODE AS SIMPLE AND READABLE AS YOU CAN


**Hypothetical API call**

```cmd
[
 {
   id: 1,
   quantity: 5,
   sku: "green-ball",
   location: "a1"
 },
 {
   id: 2,
   quantity: 6,
   sku: "red-ball",
   location: "a2"
 },
 {
   id: 3,
   quantity: 3,
   sku: "umbrella",
   location: "a3"
 }
]
```


**Expected result to be packed**

```cmd
1
   Green ball (2)
   Blue ball (4)
   Umbrella (2)
2
   Green ball (3)
   Blue ball (2)
3
   Umbrella (1)
```


## Available built-in commands

**Run the dev mode**

```cmd
yarn dev
```

**Build the Nextjs app**

```cmd
yarn build
```

**Run the dev builded mode**

```cmd
yarn start
```

**Run the tests**
Coverage report will be available under .coverage folder

```cmd
yarn test
```
