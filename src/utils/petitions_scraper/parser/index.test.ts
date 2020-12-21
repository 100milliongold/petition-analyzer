import parser from './index'

import html from './sample'

describe('parser', () => {
  const res = parser(html)
  if (res !== undefined) {
    test('begin 이 null 이 안되야만 함', () => {
      expect(res.begin).not.toBeNull()
    })
    test('end 이 null 이 안되야만 함', () => {
      expect(res.end).not.toBeNull()
    })
    test('category 이 null 이 안되야만 함', () => {
      expect(res.category).not.toBeNull()
    })
    test('content 이 null 이 안되야만 함', () => {
      expect(res.content).not.toBeNull()
    })
    test('crawled_at 이 null 이 안되야만 함', () => {
      expect(res.crawled_at).not.toBeNull()
    })
    test('num_agree 이 null 이 안되야만 함', () => {
      expect(res.num_agree).not.toBeNull()
    })
    test('status 이 null 이 안되야만 함', () => {
      expect(res.status).not.toBeNull()
    })
    test('title 이 null 이 안되야만 함', () => {
      expect(res.title).not.toBeNull()
    })
  }
})
