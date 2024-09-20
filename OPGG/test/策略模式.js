// 1. 定义不同的策略
const discountStrategies = {
    noDiscount: (price) => price, // 无折扣
    tenPercentDiscount: (price) => price * 0.9, // 打9折
    twentyPercentDiscount: (price) => price * 0.8 // 打8折
};

// 2. 定义上下文类，用来选择和应用策略
class ShoppingCart {
    constructor() {
        this.price = 0;
        this.discountStrategy = discountStrategies.noDiscount; // 默认无折扣
    }

    // 设置总价
    setPrice(price) {
        this.price = price;
    }

    // 设置折扣策略
    setDiscountStrategy(strategy) {
        this.discountStrategy = strategy;
    }

    // 计算最终价格
    calculateFinalPrice() {
        return this.discountStrategy(this.price);
    }
}

// 3. 使用策略模式
const cart = new ShoppingCart();

// 设置商品价格
cart.setPrice(100);

// 使用 9 折策略
cart.setDiscountStrategy(discountStrategies.tenPercentDiscount);
console.log('Final Price with 10% discount:', cart.calculateFinalPrice()); // 输出：Final Price with 10% discount: 90

// 使用 8 折策略
cart.setDiscountStrategy(discountStrategies.twentyPercentDiscount);
console.log('Final Price with 20% discount:', cart.calculateFinalPrice()); // 输出：Final Price with 20% discount: 80

// 使用无折扣策略
cart.setDiscountStrategy(discountStrategies.noDiscount);
console.log('Final Price with no discount:', cart.calculateFinalPrice()); // 输出：Final Price with no discount: 100
