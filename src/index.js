/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';

import {Button, IconButton, PanelBody, TextControl, Placeholder,} from '@wordpress/components';

import {InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {Fragment} from '@wordpress/element';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('lend/lend-table-of-content', {
	title: 'Lend Table of Content',
	icon: 'shield',
	category: 'common',
	attributes: {
		table: {
			type: 'array',
			default: [],
		},
		skipText: {
			type: 'string'
		}, 
		skipLink: {
			type: 'string'
		}
	},
	keywords: [
		'Table of Contents',
	],
	edit: (props) => {
		const handleAddItemTable = () => {
			const table = [...props.attributes.table];
			table.push({
				title: '',
				link: '',
			});
			props.setAttributes({table});
		};
		const handleRemoveTableSingle = (index) => {
			const table = [...props.attributes.table];
			table.splice(index, 1);
			props.setAttributes({table});
		};
		const linkTableContent = (link, index) => {
			const table = [...props.attributes.table];
			table[index].link = link;
			props.setAttributes({table});
		};
		const handletitletableChange = (title, index) => {
			const table = [...props.attributes.table];
			table[index].title = title;
			props.setAttributes({table});
		};
		const {
			attributes: { skipLink, skipText },
			setAttributes
		} = props;
		const onChangeSkipText = value => {
			setAttributes({ skipText: value });
		};
		const onChangeSkipLink = value => {
			setAttributes({ skipLink: value });
		};
		let titleFields,
			skipTextField,
			skipLinkField,
			titleDisplay;

		skipTextField = <TextControl
					className="lend-skip-text"
                    placeholder="'Skip to Section' Text"
                    value={skipText}
                    onChange={onChangeSkipText}
                />
		skipLinkField = <TextControl
					className="lend-skip-link"
                    placeholder="'Skip to Section' Link"
                    value={skipLink}
                    onChange={onChangeSkipLink}
                />

		if (props.attributes.table.length) {
			titleFields = props.attributes.table.map((locationtable, index) => {
				return <Fragment key={index}>
					<IconButton
						className="lend-locationtable-title"
						icon="no-alt"
						label="Delete Item"
						onClick={() => handleRemoveTableSingle(index)}
					/>
					<TextControl
						className="lend-title"
						placeholder="Here goes the indicator for the section title"
						value={props.attributes.table[index].title}
						onChange={(title) => handletitletableChange(title, index)}
					/>
					<TextControl
						className="lend-title"
						placeholder="Here goes the indicator for the section link"
						value={props.attributes.table[index].link}
						onChange={(link) => linkTableContent(link, index)}
					/>
				</Fragment>;
			});

			titleDisplay = props.attributes.table.map((locationtable, index) => {
				return <li key={index}><a href={locationtable.link !== '' ? locationtable.link : '#'}>{locationtable.title !== '' ? locationtable.title : 'Here goes the indicator for the section title' }</a></li>;
			});
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={__('Table of Contents Skip to Section')}>
					{skipTextField}
					{skipLinkField}
				</PanelBody>
				<PanelBody title={__('Table of Contents Items')}>
					{titleFields}
					<Button
						isDefault
						onClick={handleAddItemTable.bind(this)}
					>
						{__('Add Item')}
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className="table-of-contents">
				<div className="table-of-contents-header">
					<h2 className="table-of-contents-title">Table of Contents</h2>
					<a href='#down-end-id' className="table-of-contents-skip-section">Skip to Section</a>
					<a href={skipLink !== '' ? skipLink : '#down-end-id'} className="table-of-contents-skip-section">{skipText !== '' ? skipText : 'Skip to Section'}</a>
				</div>
				<ul>
					{titleDisplay}
				</ul>
			</div>,
		];
	},
	save: () => {
		return null;
	},
});
