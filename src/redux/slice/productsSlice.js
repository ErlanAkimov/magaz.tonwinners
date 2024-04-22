import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	{
		_id: 'drop-coin',
		name: 'TON Drop coins',
		description:
			"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\Don't miss the opportunity to get souvenirs at a low price",
		type: 'souvenir',
		category: 'Drops & Minings',
		subCategory: 'dropcoins',
		price: 5,
		currency: "TON",
		sold: 630,
		deliverMin: 4,
		deliverMax: 8,
		specialQuote:
			'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
		properties: [
			{
				weight: '6,5 g',
			},
			{
				diameter: '36 mm',
			},
			{
				thikness: '3,5 mm',
			},
		],
		images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
		deliveryFee: 5,
	},
	
]

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
});

export const { 
} = productsSlice.actions;

export default productsSlice.reducer;
