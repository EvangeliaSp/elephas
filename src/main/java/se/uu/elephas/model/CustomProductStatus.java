package se.uu.elephas.model;

public enum CustomProductStatus {

    PENDING (1),
    CONFIRMED(2),
    REJECTED(3),
    PAID(4),
    DECLINED(5),
    COMPLETED(6)
    ;

    private final int value;

    CustomProductStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

}
