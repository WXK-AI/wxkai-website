import DocumentShell from './components/DocumentShell.jsx'
import HalfTitle from './components/HalfTitle.jsx'
import Contents from './components/Contents.jsx'
import Preface from './components/Preface.jsx'
import Particulars from './components/Particulars.jsx'
import GenGuardChapter from './components/GenGuardChapter.jsx'
import LangfuseChapter from './components/LangfuseChapter.jsx'
import HardeningChapter from './components/HardeningChapter.jsx'
import ViperChapter from './components/ViperChapter.jsx'
import LabChapter from './components/LabChapter.jsx'
import Colophon from './components/Colophon.jsx'

export default function App() {
  return (
    <DocumentShell>
      <HalfTitle />
      <Contents />
      <Preface />
      <Particulars />
      <GenGuardChapter />
      <LangfuseChapter />
      <HardeningChapter />
      <ViperChapter />
      <LabChapter />
      <Colophon />
    </DocumentShell>
  )
}
