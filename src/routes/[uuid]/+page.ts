import { fetchItem } from '@digitalculture/ochre-sdk';
export async function load({ params }) {
    const { error, item } = await fetchItem(params.uuid, 'spatialUnit');
    if (error !== null) {
        throw new Error('Response failed!');
    }
    return { item };
}