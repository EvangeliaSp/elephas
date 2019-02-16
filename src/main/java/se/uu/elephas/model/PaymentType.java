package se.uu.elephas.model;

enum PaymentType {
    CREDIT_CARD(1),
    PAYPAL(2),
    SWISH(3)
    ;

    private final int value;

    PaymentType(int value) {
        this.value = value;
    }

    protected int getValue() {
        return this.value;
    }

}
