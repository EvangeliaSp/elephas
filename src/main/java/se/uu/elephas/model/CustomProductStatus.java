package se.uu.elephas.model;

public enum CustomProductStatus {

    COMPLETED (1),
    CANCELLED(2),
    SHIPPED(3),
    IN_PROGRESS(4)
    ;

    private final int value;

    CustomProductStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

}
