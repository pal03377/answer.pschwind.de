<script>

    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const AVAILABLE_EFFECTS = ["1"];

    onMount(() => {
        if (location.hash || location.search) {
            let chosenEffect = AVAILABLE_EFFECTS[Math.floor(Math.random() * AVAILABLE_EFFECTS.length)];
            goto(`/${ chosenEffect }${ location.hash }${ location.search }`, { replaceState: true });
        } else {
            goto("/create", { replaceState: true });
        }
    });

</script>