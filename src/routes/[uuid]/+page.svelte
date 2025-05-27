<script lang="ts">
    const { data } = $props();
    const item = data.item;
    import {getUniquePropertyLabels, getPropertyValueByLabel} from '@digitalculture/ochre-sdk';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
</script>
<Button class = "m-5" href="/">Home</Button>
<div class="mx-auto bg-white mb-10 p-5 max-w-xl rounded-xl">
    {#if item.image?.url}
        <img class="mb-10" src={item.image.url} alt={item.identification.label} />
    {/if}
    <h1 class="font-bold text-2xl text-center">{item.identification.label}</h1>
    <h2 class="text-lg italic text-center">{item.description}</h2>
    <Table.Root>
        <Table.Body>
            {#each item.properties as property}
                {#if getPropertyValueByLabel(item.properties, property.label)}
                    <Table.Row>
                        <Table.Cell>
                            {property.label}
                        </Table.Cell>
                        <Table.Cell>
                            {getPropertyValueByLabel(item.properties, property.label)}
                        </Table.Cell>
                    </Table.Row>
                {/if}
                {#if getUniquePropertyLabels(property.properties)}
                    {#each getUniquePropertyLabels(property.properties) as subLabel}
                        <Table.Row>
                            <Table.Cell>
                                <p class="ml-5">{subLabel}</p>    
                            </Table.Cell>
                            <Table.Cell>
                                {getPropertyValueByLabel(property.properties, subLabel)}
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            {/each}
        </Table.Body>
    </Table.Root>
    
</div>
    

