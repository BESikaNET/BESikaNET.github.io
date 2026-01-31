.contacts {
    position: relative;
    width: 100%;
    padding: 35px 0;
    overflow: hidden;
        
    &__container {
        .container(); 
        display: flex;
        flex-wrap: wrap; /* Добавил для адаптивности */
        gap: 60px; /* Добавил отступ между списком и картой */
    }
    
    &__title {
        width: 100%; /* Чтобы заголовок был на всю ширину */
        margin-bottom: 40px; /* Добавил отступ снизу */
    }
    
    &__list-wrapper {
        flex: 1; /* Займет доступное пространство */
        min-width: 300px; /* Минимальная ширина */
    }
    
    &__list {
        max-width: 470px;
        padding: 0;
        margin: 0;
        position: relative;
    }
    
    &__item {
        display: flex;
        align-items: flex-start;
        gap: 54px;
        margin-bottom: 67px;
        
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    &__item-mark {
        flex-shrink: 0;
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: @white;
        border-radius: 50%;
        box-shadow: 0 4px 15px fade(@black, 10%);
    }
    
    &__item-icon {
        width: 110px;
        height: 110px;
    }
    
    &__item-content {
        padding-top: 10px;
    }
    
    &__item-title {
        margin: 0 0 10px 0;
        font-family: 'Open Sans', sans-serif; 
        font-weight: 600; 
        font-size: 20px; 
        line-height: 27px; 
        letter-spacing: 0%; 
        text-align: left; 
    }
    
    &__item-info {
        margin: 5px 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0%;
        text-align: left;
    }
    
    &__map {
        flex: 1; /* Карта также займет доступное пространство */
        min-width: 300px; /* Минимальная ширина */
        height: 400px;
        border-radius: 10px;
        position: relative;
        z-index: 1;
        background-color: #f0f0f0; /* Временный фон для видимости */
        
        /* Убрал margin-top, так как используем gap в контейнере */
    }
}

/* Добавьте медиа-запрос для мобильных устройств */
@media (max-width: 768px) {
    .contacts {
        &__container {
            flex-direction: column;
        }
        
        &__list {
            max-width: 100%;
        }
        
        &__map {
            width: 100%;
            height: 300px;
        }
    }
}