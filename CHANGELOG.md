# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2024-12-21

### Fixed

- ESM exports for OpenAPI and MongoDB

## [0.3.0] - 2024-12-21

### Changed

- [BREAKING] Generation of Jdv validation rules switched to use of `@peassoft/jdv` format.

## [0.2.0] - 2024-11-17

### Added

- Processing nullable object keys in Jdv.

## [0.1.5] - 2023-12-06

### Fixed

- Required fields array was not generated for mongodb validation scheme for arrays of reference types.

## [0.1.4] - 2023-08-26

### Fixed

- CommonJS build step.

## [0.1.3] - 2023-08-26

### Fixed

- MongoDB validation shema generation for arrays of enum items.

## [0.1.2] - 2023-07-30

### Fixed

- Bin entrypoint shebang

## [0.1.1] - 2023-07-29

### Fixed

- Bin exposure in package.json

## [0.1.0] - 2023-07-29

### Added

- Initial release
