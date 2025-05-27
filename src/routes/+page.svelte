<script lang="ts">
    import { MapLibre, DefaultMarker } from 'svelte-maplibre';
    import { type Coordinates } from '@digitalculture/ochre-sdk';
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import { getUniquePropertyLabels, getPropertyValueByLabel } from '@digitalculture/ochre-sdk';
    const { data } = $props();
    const propertyLabels = getUniquePropertyLabels(data.set.items[0]!.properties);
    let search: string = $state<string>('');
    let filteredItems = $derived(
        search === ''
        ? data.set.items : 
        data.set.items.filter((item) => {
            const searchLower = search.toLocaleLowerCase();
            
            const nameMatch = item.identification.label.toLocaleLowerCase().includes(searchLower);
            return nameMatch
            }
        )
        )
</script>
<MapLibre
    zoom={4}
    center={[33.9292, 36.0369]}
    class="h-[300px] rounded-lg container mx-auto my-10"
    style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
    {#each filteredItems as item}
        {#if item.coordinates}
            <DefaultMarker lngLat={[item.coordinates.longitude, item.coordinates.latitude]} />
        {/if}
    {/each}
</MapLibre>
<div class="container mx-auto mb-10 bg-white p-5 rounded-xl ">
    <Input bind:value={search} placeholder="Search by name"         class="max-w-xs mx-auto text-center mb-5" />
    <Table.Root>
        <Table.Caption>My OCHRE Items</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[100px]">
                    Name
                </Table.Head>
                {#each propertyLabels as property}
                    <Table.Head>{property}</Table.Head>
                {/each}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each filteredItems as item}
            <Table.Row>
                <Table.Cell>
                    <a href = {item.uuid}>{item.identification.label}</a>
                </Table.Cell>
                {#each item.properties as property}
                <Table.Cell>
                    {getPropertyValueByLabel(item.properties, property.label)}
                </Table.Cell>
                {/each} 
            </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
