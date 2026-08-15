import { primaryLegislation, bylawCategories } from './data/regulativa'
import { publications } from './data/publikacije'

export function buildStaticSearchIndex() {
  const regulativaItems = [
    ...primaryLegislation,
    ...bylawCategories.flatMap((category) => category.items),
  ].map((item) => ({
    type: 'regulativa',
    typeLabel: 'Regulativa',
    title: item.title,
    meta: item.reference,
    file: item.file,
    sizeKb: item.sizeKb,
    routeTo: '/regulativa',
  }))

  const publikacijeItems = publications.map((pub) => ({
    type: 'publikacija',
    typeLabel: 'Publikacija',
    title: pub.title,
    meta: pub.dateLabel || null,
    file: pub.file,
    sizeKb: pub.sizeKb,
    routeTo: '/publikacije',
  }))

  return [...regulativaItems, ...publikacijeItems]
}

export function announcementsToSearchIndex(announcements) {
  return announcements.map((item) => ({
    type: 'oglas',
    typeLabel: 'Oglas',
    title: item.title,
    meta: item.is_open ? 'Otvoreno' : 'Isteklo',
    file: null,
    sizeKb: null,
    routeTo: '/oglasi',
  }))
}
