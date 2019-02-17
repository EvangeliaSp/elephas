package se.uu.elephas.model;

enum Status {
    COMPLETED (1),
    CANCELLED(2),
    SHIPPED(3),
    IN_PROGRESS(4)
    ;

    private final int value;

    Status(int value) {
        this.value = value;
    }

    protected int getValue() {
        return this.value;
    }

}
