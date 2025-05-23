# Changelog

## [3.1.0](https://github.com/graasp/graasp-app-excalidraw/compare/v3.0.2...v3.1.0) (2025-05-07)


### Features

* remove s3 ([#74](https://github.com/graasp/graasp-app-excalidraw/issues/74)) ([84e9067](https://github.com/graasp/graasp-app-excalidraw/commit/84e9067aba66b47109dafadbb0e4b09d6519125d))


### Bug Fixes

* fix deploy workflows ([7f30ba2](https://github.com/graasp/graasp-app-excalidraw/commit/7f30ba24d91c6131fb51b488fa2f461a6c8de362))

## [3.0.2](https://github.com/graasp/graasp-app-excalidraw/compare/v3.0.1...v3.0.2) (2024-01-09)


### Bug Fixes

* **deps:** update dependency @sentry/react to v7.89.0 ([#51](https://github.com/graasp/graasp-app-excalidraw/issues/51)) ([dd75fe4](https://github.com/graasp/graasp-app-excalidraw/commit/dd75fe4b1b02d21286211fb5f96de2fd6e4f0465))
* update renovate config to use graasp app config ([#57](https://github.com/graasp/graasp-app-excalidraw/issues/57)) ([f0f4935](https://github.com/graasp/graasp-app-excalidraw/commit/f0f49353322ee5d6b27691782df98a8357e26570))

## [3.0.1](https://github.com/graasp/graasp-app-excalidraw/compare/v3.0.0...v3.0.1) (2023-11-19)


### Bug Fixes

* imperative API excalidraw prop ([b9a9a3f](https://github.com/graasp/graasp-app-excalidraw/commit/b9a9a3f3b1fd65027cac90d99acb24720bf79c6c))
* imperative API props for Excalidraw 0.17 ([#39](https://github.com/graasp/graasp-app-excalidraw/issues/39)) ([b9a9a3f](https://github.com/graasp/graasp-app-excalidraw/commit/b9a9a3f3b1fd65027cac90d99acb24720bf79c6c))

## [3.0.0](https://github.com/graasp/graasp-app-excalidraw/compare/v2.0.0...v3.0.0) (2023-08-02)


### ⚠ BREAKING CHANGES

* the data model changed and this new version will not work with previous types of app data

### refactor

* serde elements and app state in app data ([e7755a2](https://github.com/graasp/graasp-app-excalidraw/commit/e7755a26957d5d3c178261c1a7ebe6444c6cc63e))


### Features

* add refresh button ([b95038a](https://github.com/graasp/graasp-app-excalidraw/commit/b95038a9c8c2ae5f5856d10d903ae24d1dbe1aee))
* implement file upload and download ([33c310a](https://github.com/graasp/graasp-app-excalidraw/commit/33c310a951d97dbf5aa44c38bc45306563ffac82))
* save images (wip) ([ed9def3](https://github.com/graasp/graasp-app-excalidraw/commit/ed9def3b097d54133c70c725b0b20117f542775c))


### Bug Fixes

* refactor form data when uploading file ([e184b8e](https://github.com/graasp/graasp-app-excalidraw/commit/e184b8e38be044e3c19ea69da815739c07e194e0))

## [2.0.0](https://github.com/graasp/graasp-app-excalidraw/compare/v1.0.0...v2.0.0) (2023-03-23)


### ⚠ BREAKING CHANGES

* the data management scheme changed.

### Features

* refactor state saving for collaboration ([af1c111](https://github.com/graasp/graasp-app-excalidraw/commit/af1c111b9519c9c410308d6c16b3db7a643d60a9))

## 1.0.0 (2023-01-18)


### Features

* added all components for connnection with QUERY-CLIENT need to add package excalidraw ([18275d9](https://github.com/graasp/graasp-app-excalidraw/commit/18275d9910d95cc5352fef8cafa8c67ffeac1c9d))
* added debounce for asyn treatment of patches ([40e4492](https://github.com/graasp/graasp-app-excalidraw/commit/40e44928d8e329ade21995e5c1ad495cbee4275f))
* added logic for restore ([70e82ba](https://github.com/graasp/graasp-app-excalidraw/commit/70e82baedb3c2ffcb5b350748fe74aa84d5f0cd6))
* encapsulation of excalidraw componen ([b4a7c5b](https://github.com/graasp/graasp-app-excalidraw/commit/b4a7c5ba649b3cb6c45657e0f704bb8e0d7408d4))
* encapsulation of excalidraw component ([3b0d30a](https://github.com/graasp/graasp-app-excalidraw/commit/3b0d30a918d3c8b0ce991e95768c090a9ecf9f77))
* encapsulation of excalidraw component ([6f9dc8f](https://github.com/graasp/graasp-app-excalidraw/commit/6f9dc8f9f55c6263ff06567ee3db5fb30f70bbed))
* excalidraw component added ([44fea4d](https://github.com/graasp/graasp-app-excalidraw/commit/44fea4dca22079001276b1b6502a091329a498d6))
* view updated to full screen ([30188d5](https://github.com/graasp/graasp-app-excalidraw/commit/30188d5e0c987f87abcb88507be12a976ce2637b))


### Bug Fixes

* add useffect to trigger rerender ([50fae7a](https://github.com/graasp/graasp-app-excalidraw/commit/50fae7a204ab611541c9b3ae454ccdcb753e90ec))
* collapsing with autoresize ([d8028a7](https://github.com/graasp/graasp-app-excalidraw/commit/d8028a710173f553efa0cca7f0db5c2d26129c25))
* debounce value decreased ([9bc91fe](https://github.com/graasp/graasp-app-excalidraw/commit/9bc91fed6176c7423d2a69ccccf37458afaa72f2))
* disabled state use ([9c20bd2](https://github.com/graasp/graasp-app-excalidraw/commit/9c20bd2bb0619dd3980418583ce7b015e330778e))
* disabled state use ([593357a](https://github.com/graasp/graasp-app-excalidraw/commit/593357ad7efc4b19b0141ffddafa7b407bd6c9ab))
* player view ([eda4ae9](https://github.com/graasp/graasp-app-excalidraw/commit/eda4ae9e21634dfb442f109bf88996581ed8a235))
* rename sentry dsn env variable name ([dc97573](https://github.com/graasp/graasp-app-excalidraw/commit/dc97573a18b83bd778c2e1b259bcf8209750a208))
* return a view instead of a loader when standalone ([8c14bb8](https://github.com/graasp/graasp-app-excalidraw/commit/8c14bb8e283c8d9b601e179d860e6a470761b142))
* typos in readme ([#13](https://github.com/graasp/graasp-app-excalidraw/issues/13)) ([383f736](https://github.com/graasp/graasp-app-excalidraw/commit/383f7367d9627a208755fe99cc73f92acfa9a70d))
* use vh unit for app height ([e828213](https://github.com/graasp/graasp-app-excalidraw/commit/e828213396f87c449046254043c09419b7e7221b))


### Tests

* added logs to debug player view ([64f9a27](https://github.com/graasp/graasp-app-excalidraw/commit/64f9a27045724c5ad40c9d2cb0ee4f3a9f6f8c13))
