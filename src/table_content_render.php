<?php
/**
 * Holds all the functions, that displays the block frontend
*/
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

register_block_type( 'lend/lend-table-of-content', [ 'render_callback' => 'lend_render_table_output' ] );

/**
 * Renders the block front end HTML
 *
 * @param $attributes
 *
 * @return string
 */
function lend_render_table_output( $attributes ) {
	$output_safe = '';
	$table_items = $attributes['table'] ?? [];
	$table_skip_text = $attributes['skipText'] ?? [];
	$table_skip_link = $attributes['skipLink'] ?? [];
	$skip_text  = ! empty( $table_skip_text ) ? $table_skip_text : __( 'Skip to Section' );
	$skip_link  = ! empty( $table_skip_link ) ? $table_skip_link : __( '#down-end-id' );
	$output_safe .= '<div class="table-of-contents">';
	$output_safe .= '<div class="table-of-contents-header">';
	$output_safe .= '<h2 class="table-of-contents-title">' . __( 'Table of Contents' ) . '</h2>';
	$output_safe .= '<a href="' . esc_url( $skip_link ) . '" class="table-of-contents-skip-section">' . __( $skip_text ) . '</a>';
	$output_safe .= '</div>';
	$output_safe .= '<ul>';
	if ( ! empty( $table_items ) ) {
		foreach ( $table_items as $table_item ) :
			$item_title  = ! empty( $table_item['title'] ) ? $table_item['title'] : __( 'Here goes the indicator for the section title' );
			$item_link   = ! empty( $table_item['link'] ) ? $table_item['link'] : '#';
			$output_safe .= '<li><a href="' . esc_url( $item_link ) . '" >' . esc_html( $item_title ) . '</a></li>';
		endforeach;
	}

	$output_safe .= '</ul>';
	$output_safe .= '</div>';
	$output_safe .= '<div id="down-end-id"></div>';

	return $output_safe;

}
