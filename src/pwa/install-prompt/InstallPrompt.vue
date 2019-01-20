<template>
    <aside v-if="show" class="install-prompt" v-bind:class="{'install-prompt--show' : show }">
        <button class="install-prompt__close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>

        <p class="install-prompt__message">
            Install App on your home screen for quick and easy access when you are on the go.
        </p>

        <p v-if="!isIOS" class="install-prompt__message install-prompt--only-chrome">
            <button @click="install" class="btn btn-primary">Install now
            </button>
        </p>

        <p v-if="isIOS" class="install-prompt__message install-prompt__message--only-ios">
            <span>Just Tap</span>
            <span role="img" aria-label="Apple Share Icon">
                <svg class="main-menu__nav__item__link__icon">
                    <use xlink:href="#apple-share--sprite"></use>
                </svg>
            </span>
            <span>then "Add to Home Screen".</span>
        </p>
    </aside>
</template>
<script lang="ts">

import '@/assets/apple-share.svg?sprite';

import { Component, Prop, Vue } from 'vue-property-decorator';
import ServiceWorkerManager from './../ServiceWorkerManager';

@Component({})
export default class InstallPrompt extends Vue {

    private isIos!: true;
    private show: boolean = false;
    
    async install() {
        this.show = false;
    }
}

</script>
<style lang="scss">
@import '@/_vars.scss';

.install-prompt {
    position: fixed;
    z-index: 100;
    width: 100%;
    left: 50%;
    bottom: 0;
    max-width: 28rem;
    text-align: center;
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: $transition-time;
    transition-timing-function: ease-in-out;
    background-color: #FFF;
    padding: 3rem 1rem 2rem;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);

    &--show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }

    &__message {
        font-size: $font-size-base;
        color:  #333;

        &--only-ios {
            margin: 0;
        }
    }

    &__close {
        @include button-reset;
        position: absolute;
        right: 0;
        top: 0;
        color: #333;
        padding: 0.3125rem 1rem;
        font-size: 1.5rem;
        transition: color $transition-time ease;

        &:hover {
            color: #000;
        }
    }

    &__share-icon {
        fill: #000;
        stroke: #000;
        height: 1em;
        width: 1em;
    }
}
</style>
