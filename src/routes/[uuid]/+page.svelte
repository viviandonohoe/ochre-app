<script lang="ts">
    const { data } = $props();
    const item = data.item;
    import {getUniquePropertyLabels, getPropertyValueByLabel} from '@digitalculture/ochre-sdk';
    import { Button } from "$lib/components/ui/button/index.js";
</script>
<Button class = "m-5" href="/">Home</Button>
<div class="mx-auto bg-white mb-10 p-5 max-w-xl rounded-xl">
    {#if item.image?.url}
        <img class="mb-10" src={item.image.url} alt={item.identification.label} />
    {/if}
    <h1 class="font-bold text-2xl">{item.identification.label}</h1>
    {#each item.properties as property}
        {#if getPropertyValueByLabel(item.properties, property.label)}
            <p>{property.label}: {getPropertyValueByLabel(item.properties, property.label)}</p>
        {/if}
        {#if property.label == "Classification"}
            {#if getPropertyValueByLabel(property.properties, "Object type")}
                <p>Object Type: {getPropertyValueByLabel(property.properties, "Object type")}</p>
                {#if getPropertyValueByLabel(property.properties[0].properties, "Part")}
                    <p>Part: {getPropertyValueByLabel(property.properties[0].properties, "Part")}</p>
                {/if}
            {/if}    
        {/if}
    {/each} 
    
</div>
