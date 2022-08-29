<?php
/**
 * Plugin Name:       Lend Table Of Content
 * Description:       Table of content block
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Lend EDU
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lend-table-of-content
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function create_block_lend_table_of_content_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_lend_table_of_content_block_init' );


require_once plugin_dir_path( __FILE__ ) . 'src/table_content_render.php';
