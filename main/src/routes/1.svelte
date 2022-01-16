<script>

    import { onMount } from "svelte";
    import Info from "../components/Info.svelte";
    import getName from "../js/getName";

    let greeting = ["Hello", "Hi", "Hey"][Math.floor(Math.random() * 3)];

    let name;
    onMount(() => name = getName());

</script>


<svelte:head><title>{ name }, please answer your important message</title></svelte:head>

{#if name}
    <div class="effect">
        <span class="wave">👋</span>
        <h1>{ greeting } { name }!</h1>
        <p>This message was sent to you to kindly ask you whether you could</p>
        <b>please answer</b>
        <p>the message you got. It would mean a lot.</p>
        <Info />
    </div>
{/if}


<style>

    .effect {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px;
        box-sizing: border-box;
        text-align: center;
    }

    @keyframes wave {
        0% { transform: rotate( 0deg); }
        5% { transform: rotate(14deg); }
        10% { transform: rotate(-8deg); }
        15% { transform: rotate(14deg); }
        20% { transform: rotate(-4deg); }
        25% { transform: rotate(10deg); }
        30% { transform: rotate( 0deg); }
        100% { transform: rotate( 0deg); }
    }

    .wave {
        display: block;
        width: fit-content;
        font-size: 52px;
        animation-name: wave;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-delay: 5s;
        transform-origin: 70% 70%;
        text-decoration: none;
        color: black;
    }

    b {
        font-size: 1.5em;
    }

</style>