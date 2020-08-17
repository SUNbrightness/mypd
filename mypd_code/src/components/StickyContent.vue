<template>
    <div class="sticky-border">
        <div class="stick-content">
            <slot >
                
            </slot>
        </div>
        <div class="stick-bottom">
            <slot name="foot">
                
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        install(vue) {
          vue.component("sticky-content", this);
        }
    };
</script>

<style>
    .sticky-border{
        height: 100%;
    }
    .stick-content {
        height: 100%;
        padding-bottom: 44px;
        box-sizing: border-box;
    }
    .stick-bottom{
        margin-top: -44px;
        height: 44px;
    }
</style>
