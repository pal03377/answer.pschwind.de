<script>

    import { jumbleName } from "../js/jumbleName";
    import Info from "../components/Info.svelte";

    let name = "";

    let clipboardSuccess = false;
    async function clipboardWrite(text) {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            clipboardSuccess = true;
        }
    }

    let link = "";
    function getLink() {
        if (!name) return;
        link = location.host + "#" + name;
        clipboardWrite(link);
    }
    
    let jumbledLink = "";
    function jumbleLink() {
        jumbledLink = location.host + "?" + jumbleName(name);
        clipboardWrite(jumbledLink);
    }

</script>


<svelte:head><title>pls answer me :-(</title></svelte:head>

<div class="main">
    <h1><span class="red">pls</span> answer</h1>
    <p>Ask a friend to remember to answer your texts by sending a link.</p>
    <form>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="text">
            <input bind:value={ name } type="text" placeholder="Your friend's name..." maxlength={ 16 } required autofocus>
            {#if link}
                <div class="copyOverlay">
                    {#if jumbledLink}
                        <span>Jumbled: <b>{ jumbledLink }</b></span>
                    {:else}
                        <span>Link: <b>{ link }</b></span>
                    {/if}
                    {#if clipboardSuccess}
                        <span class="copied">copied to clipboard</span>
                    {/if}
                </div>
            {/if}
        </div>
        {#if link}
            <button type="submit" on:click|preventDefault={ jumbleLink }>
                Jumble
            </button>
        {:else if jumbledLink}
            <button type="submit" on:click|preventDefault={ () => jumbledLink = null }>
                Unjumble
            </button>
        {:else}
            <button type="submit" on:click|preventDefault={ getLink } disabled={ !name }>
                Get link
            </button>
        {/if}
    </form>

    <Info />
</div>


<style>

    .main {
        position: absolute;
        width: 62vw;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 2vw;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 6.5em;
        font-weight: normal;
        margin: 0;
    }

    .red {
        color: var(--red);
    }

    p {
        margin: 0;
        margin-bottom: 4vw;
    }

    form {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .text {
        position: relative;
        width: calc(80% - 12px);
        height: 100%;
    }

    input {
        width: 100%;
        font-size: 3vw;
        padding: 8px 14px;
        box-sizing: border-box;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .1) inset;
    }

    @media (prefers-color-scheme: dark) {
        input {
            border: 2px solid rgba(255, 255, 255, .2);
        }
    }

    .copyOverlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1em;
    }

    .copied {
        font-size: 0.8em;
        color: darkgreen;
    }

    @media (prefers-color-scheme: dark) {
        .copied {
            color: green;
        }
    }

    button {
        width: 20%;
        height: 100%;
        font-size: 2.2vw;
        font-weight: bold;
        color: white;
        background-color: var(--red);
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .1) inset;
        transition: filter 300ms;
    }

    button:disabled {
        filter: grayscale(.4);
        opacity: .9;
    }

    input:focus, button:focus {
        outline: var(--special) auto 1px;
    }

    @media screen and (max-width: 770px) {
        p {
            font-size: 16px;
        }
        .copyOverlay {
            font-size: 16px;
        }
        button {
            font-size: 16px;
        }
    }

    @media screen and (max-width: 500px) {
        .main {
            width: 90vw;
            font-size: 16px;
        }
        h1 {
            font-size: 3.6em;
        }
        form {
            max-width: 350px;
        }
        .text {
            width: 100%;
        }
        input {
            font-size: 24px;
        }
        p {
            max-width: 350px;
            margin-top: 8px;
            margin-bottom: 24px;
        }
    }

    @media screen and (max-width: 600px) {
        form {
            flex-direction: column;
        }
        button {
            width: 96px;
            height: 42px;
        }
    }

</style>